# Setup and manage bluetooth

**Last updated**: April 2, 2022

Bluetooth management and setup guide. Targeted for `redhat` distributions.

## Step by step guide

1. Install bluetooth libraries:

    ```bash
    dnf install bluez
    ```

2. Reboot or and make sure bluetooth service is running:

    ```bash
    systemctl start bluetooth
    ```
