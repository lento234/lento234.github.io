# A guide to setup MATLAB kernel in jupyterhub

References:
- [https://jupyterhub.readthedocs.io/en/stable/quickstart.html#installation](https://jupyterhub.readthedocs.io/en/stable/quickstart.html#installation).
- [https://github.com/mathworks/jupyter-matlab-proxy](https://github.com/mathworks/jupyter-matlab-proxy)
- [https://github.com/markusschanta/awesome-jupyter#jupyterlab-extensions](https://github.com/markusschanta/awesome-jupyter#jupyterlab-extensions)

1. Setup jupyterhub environment:

    ```bash
    conda install -c conda-forge jupyterhub  # installs jupyterhub and proxy
    conda install jupyterlab notebook  # needed if running the notebook servers in the same environmen
    ```

2. Install MATLAB kernel:

    ```bash
    python -m pip install jupyter-matlab-proxy
    jupyter labextension install @jupyterlab/server-proxy
    ```

3. Install additional extensions:

    ```bash
    jupyter labextension install @arbennett/base16-nord # theme
    pip install jupyterlab_nvdashboard # GPU dashboard
    pip install jupyterlab-drawio # drawing diagrams
    pip install nb_black # linting
    pip install jupyterlab-code-formatter # formatting
    ```


