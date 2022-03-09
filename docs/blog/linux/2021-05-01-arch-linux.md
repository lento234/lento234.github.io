# Arch Linux installation guide

**Last updated**: May 1, 2021

The installation guide below is a summarized version of the official [Installation Guide](https://wiki.archlinux.org/title/Installation_guide).

## Installing basic system

1. Choose correct keyboard keymaps

    ```bash
    loadkeys keymap
    ```

2. Assert boot mode

    ```bash
    ls /sys/firmware/efi/efivars
    ```

3. Make sure internet connection is present

    ```bash
    ping 8.8.8.8
    ```

4. Set correct system time

    ```bash
    timedatectl set-ntp true
    ```

5. Partition the disks

    1. List disks using `fdisk`

        ```bash
        fdisk -l
        ```

    2. If UEFI is present, use `GPT` and make `EFI` partition, `swap`, and root `/`

        ```bash
        cfdisk /dev/sdX # or /dev/nvme0nX
        ```

    3. Set correct size, type and write partition table.

6. Format the disks

    1. Make `EFI` partition

        ```bash
        mkfs.fat -F32 /dev/sdXA # A is EFI partition
        ```

    2. Make swap

        ```bash
        mkswap /dev/sdXB # B is swap partition
        ```

    3. Turn swap on

        ```bash
        swapon /dev/sdXB
        ```

    4. Make root fs

        ```bash
        mkfs.ext4 /dev/sdaXC # C is root partition
        ```

7. Mount root partition to `mnt`

    ```bash
    mount /dev/sdXC /mnt
    ```

8. Install necessary packages

    ```bash
    pacstrap /mnt base base-devel linux linux-firmware vim nano man zsh
    ```
## Configuring system

1. Write filesystem table

    ```bash
    genfstab -U /mnt >> /mnt/etc/fstab
    ```

2. Change root to `/mnt`

    ```bash
    arch-chroot /mnt
    ```

3. Set correct time zone

    ```bash
    ln -sf /usr/share/zoneinfo/Europe/Zurich /etc/localtime

    hwclock --systohc
    ```

4. Set locale

    1. Uncomment the correct locale

        ```bash
        vim /etc/locale.gen
        ```

    2. Set locale

        ```bash
        locale-gen
        ```

5. Set hostname and hosts

    1. Add your hostname `yourhostname`

        ```bash
        echo "yourhostname" >> /etc/hostname
        ```

    2. Append the following to `/etc/hosts`

        ```
        127.0.0.1   localhost
        ::1         localhost
        127.0.1.1   yourhostname.localdomain    yourhostname
        ```

6. Setup root password using `passwd`

    ```bash
    passwd
    ```

7. Add default users

    1. Add new user

        ```bash
        useradd -m -s /bin/zsh newuser
        ```

    2. Give new user a password with `passwd`

        ```bash
        passwd newuser
        ```

    3. Add new user to the `wheel`

        ```bash
        usermod -aG wheel,audio,video,optical,storage newuser
        ```

    4. Setup `sudo`

        ```bash
        pacman -S sudo
        ```

    5. Enable `wheel` with `visudo`

        ```bash
        visudo
        ```

8. Setup grub

    1. Install grub and efi-tools

        ```bash
        pacman -S grub efibootmgr dosfstoosl os-prober mtools
        ```

    2. Make efi boot directory

        ```bash
        mkdir /boot/EFI
        ```

    3. Mount efi partition

        ```bash
        mount /dev/sdXA /boot/EFI
        ```

    4. Install grub (efi) for x86-64

        ```bash
        grub-install --target=x86_64-efi --bootloader-id=grub_uefi --recheck
        ```

    5. Make grub config file

        ```bash
        grub-mkconfig -o /boot/grub/grub.cfg
        ```

9. Network manager for internet connectivity

    ```bash
    pacman -S networkmanager

    systectl enable NetworkManager # enable network manager
    ```

10. `Optional`: Reboot to conclude with bare system setup.

    ```bash
    exit # now back to iso image
    umount -R /mnt
    shutdown now # or reboot
    ```

## Additional setup for a complete system

1. Install audio

    ```bash
    pacman -S pulseaudio pulseaudio-alsa
    ```

2. Install a Graphical user interface; Display server (`xorg`), display driver (`nvidia`), desktop environment (`gnome`), window manager, display manager (`gdm`).

    1. Install packages

        ```bash
        pacman -S gnome nvidia # gnome-extra for further applications
        ```

    2. Enable display manager for next reboot

        ```bash
        systemctl enable gdm.service
        ```

3. Additional network tools

    ```bash
    pacman -S openssh rsync
    ```

4. Development tools: `git`, `htop`

    ```bash
    pacman -S git htop
    ```

5. Reboot

    ```bash
    exit # now back to iso image
    umount -R /mnt
    shutdown now # or reboot
    ```
