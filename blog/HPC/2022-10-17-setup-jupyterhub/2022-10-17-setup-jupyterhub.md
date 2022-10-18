# A guide to setup jupyterhub

References:

- [https://jupyterhub.readthedocs.io/en/stable/quickstart.html#installation](https://jupyterhub.readthedocs.io/en/stable/quickstart.html#installation).
- [https://github.com/markusschanta/awesome-jupyter#jupyterlab-extensions](https://github.com/markusschanta/awesome-jupyter#jupyterlab-extensions)

## Install `jupyterhub`

1. Setup jupyterhub in conda environment. This is the simplest option from experience.

    ```bash
    conda install -c conda-forge jupyterhub  # installs jupyterhub and proxy
    conda install jupyterlab notebook  # needed if running the notebook servers in the same environmen
    ```

2. Install any additional libraries (eg.: `numpy`, `cudatoolkit`, `MATLAB`)

    ```bash
    conda install -c nvidia cuda
    python -m pip install numpy scipy matplotlib # basic numerical libraries
    python -m pip install jupyter-matlab-proxy # matlab (assuming matlab is available locally)
    jupyter labextension install @jupyterlab/server-proxy
    ```

3. Install extensions for `jupyterlab`:

    ```bash
    pip install JLDracula # dracula theme
    pip install jupyterlab_nvdashboard # GPU dashboard
    pip install jupyterlab-drawio # drawing diagrams
    pip install nb_black # linting
    pip install jupyterlab-code-formatter # formatting
    ```

## Create a startup script for `jupyterhub`

A nice startup script for starting jupyterhub:

Contents of `/etc/jupyterhub/start_jupyterhub.sh`:
```bash
#!/bin/env bash

export PYTHONPATH=''
eval "$(/opt/conda/condabin/conda shell.bash hook)"

conda activate jupyterhub

jupyterhub -f jupyterhub_config.py
```

We can add additional bash config that might be needed for setting up the jupyter environment.

## Create a `systemd` unit for jupyterhub

Now to ensure that jupyterhub is started as system boot, we can add it as a `systemd` unit which will call the bash script above.

Contents of `/etc/systemd/system/jupyterhub.service`:
```bash
[Unit]
Description=JupyterHub
After=syslog.target network-online.target nginx.target sshd.target

[Service]
User=root
WorkingDirectory=/etc/jupyterhub
Environment="PATH=/opt/conda/condabin:$PATH"
ExecStart=/etc/jupyterhub/start_jupyterhub.sh

[Install]
WantedBy=multi-user.target
```

We can enabled and start the following systemd unit by:
```bash
systemctl daemon-reload
systemctl enable jupyterhub.service
systemctl start jupyterhub.service
```

Now, upon boot, a `jupyterhub` service will automatically started with jupyterhub served at default port (e.g.: `http://localhost:8880`).

## Setup reverse-proxy using `nginx`

It is still inconvenient to remember the port number. So it would be nice to have `jupyterhub` accessible at some subdomain or subdirectory (e.g.: `http://localhost/jupyter`). We can achieve this by using a reverse-proxy such as `nginx`.

Contents of `/etc/nginx/sites-available/default`:

```bash
server {
    ...

    ## >>> Append this below

	# JupyterHub
	location /jupyter/ {
	  # NOTE important to also set base url of jupyterhub to /jupyter in its config
	  proxy_pass http://127.0.0.1:8880;

	  proxy_redirect   off;
	  proxy_set_header X-Real-IP $remote_addr;
	  proxy_set_header Host $host;
	  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	  proxy_set_header X-Forwarded-Proto $scheme;

	  # websocket headers
	  proxy_set_header Upgrade $http_upgrade;
	  proxy_set_header Connection $connection_upgrade;

}
```

We can update the nginx using following commands:
```bash
nginx -t # Test the configuration
nginx -s reload # Reload the configuration
```

Now we should have jupyterhub served at: `http://localhost/jupyter`. If we have port exposed to outside, then `http://<your_hostname>/jupyter`.
