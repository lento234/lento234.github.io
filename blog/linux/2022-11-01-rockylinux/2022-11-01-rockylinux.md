# Installing Rocky Linux 9

A detailed guide on installing rocky linux is available at: [docs.rockylinux.org](https://docs.rockylinux.org/guides/installation/).

## Download and verify ISO

1. Download using `wget`:

    ```bash
    wget https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.0-20220808.0-x86_64-dvd.iso
    ```

2. Check validity of ISO

    ```bash
    wget https://download.rockylinux.org/pub/rocky/9.0/isos/x86_64/CHECKSUM
    sha256sum -c CHECKSUM --ignore-missing
    ```

3. Make bootable USB

    ```bash
    sudo dd if=/path/to/iso.iso of=/dev/sdX status=progress
    ```

    Change `/path/to/iso` and `/dev/sdX` appropriately. Use `lsblk` or `diskutil list` (macos) to find available drives.

## Install OS using anaconda

Follow the instructions shown. Setup keyboard, language, drive, softwares, network, hostname, time & date, root password and default user. Make sure to give `administrator` privileges to default user.


## Installing Graphical environment (Gnome)

```bash
sudo dnf group list
sudo dnf groupinstall "Workstation"
sudo dnf groupinstall "Server with GUI"
sudo systemctl set-default graphical
sudo reboot
```

## Install CUDA drivers and cudatoolkit

A detailed instruction is available at: [cuda-installation-guide-linux](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html).

1. Install development tools, kernel, libraries

    ```bash
    sudo dnf config-manager --set-enabled crb # codeready-builder
    sudo dnf group install -y "Development tools"
    sudo dnf install epel-release rpmfusion-free-release # extra and free
    sudo dnf install -y kernel-devel kernel-headers
    ```

2. Instructions from Nvidia Cudatoolkit: [developer.nvidia.com/cuda-downloads](https://developer.nvidia.com/cuda-downloads).

    ```bash
    sudo dnf config-manager --add-repo https://developer.download.nvidia.com/compute/cuda/repos/rhel9/x86_64/cuda-rhel9.repo
    sudo dnf clean all
    sudo dnf -y module install nvidia-driver:latest-dkms
    sudo dnf -y install cuda
    ```

3. Post-installation setup

    Append to bash environment:

    ```
    export PATH=/usr/local/cuda-11.8/bin${PATH:+:${PATH}}
    export LD_LIBRARY_PATH=/usr/local/cuda-11.8/lib64\
                            ${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
    ```

4. Install third-party libraries

    ```bash
    sudo dnf install libX11-devel libXi-devel libXmu-devel make mesa-libGLU-devel freeimage-devel
    sudo dnf --enablerepo=devel install freeglut-devel
    ```

5. Verify cuda environment

    Download [cuda samples](https://github.com/nvidia/cuda-samples), compile and run `deviceQuery`.


## Setup terminal environment

1. Install zsh

    ```bash
    sudo dnf install zsh
    ```

2. (Optional) setup and customizations

    - ohmyzsh: https://ohmyz.sh/
    - nordtheme: https://www.nordtheme.com/
    - Fira code fonts: https://github.com/tonsky/FiraCode


## Install libraries, apps, tools

1.  Monitoring apps

    ```bash
    sudo dnf install htop btop glances
    ```

2. Build tools

    ```bash
    sudo dnf install libdrm-devel systemd-devel
    sudo dnf install cmake ncurses-devel git gcc-c++
    sudo dnf install qt5-qtdeclarative
    ```

    additional:
    ```bash
    sudo dnf install gcc make dkms acpid libglvnd-glx libglvnd-opengl libglvnd-devel pkgconfig # programming
    ```

3. Audio/Video dependencies

    ```bash
    sudo dnf install vlc ffmpeg ffmpeg-devel
    ```

## Install popular apps using Flatpak

1. Setup `FlatHub` repo: [flathub.org](https://flathub.org/home)

    ```bash
    sudo dnf install flatpak
    flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
    sudo reboot
    ```

2. Install vscode, spotify, etc.

    ```bash
    flatpak install flathub com.spotify.Client
    flatpak install flathub com.slack.Slack
    flatpak install flathub us.zoom.Zoom
    ```

## Setup python environment

Install a conda environment using mambaforge: [github.com/conda-forge/miniforge](https://github.com/conda-forge/miniforge#mambaforge)


## More info

- CRB: (CRB is "Code Ready Builder" - PowerTools was a carryover from CentOS, which is still the equivalent of CRB in RHEL. crb will be the repository name going forward in Rocky Linux and other derivatives.) [More info](https://wiki.rockylinux.org/rocky/repo/#version-policy)

Additional resources:

- https://www.linuxcapable.com/how-to-install-ffmpeg-on-rocky-linux-9/
- https://medium.com/@panda1100/setup-nvidia-gpu-driver-on-rocky-linux-9-0-166d7ce111b2A
- https://darryldias.me/2021/nvidia-drivers-on-rocky-linux/
- https://www.if-not-true-then-false.com/2021/install-nvidia-drivers-on-centos-rhel-rocky-linux/
