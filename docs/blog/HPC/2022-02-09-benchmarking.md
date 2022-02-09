# A guide on basic benchmarking

**Last updated**: 9th Feb, 2022

## Storage

1. Perform timings of device/cache reads on device (`sda`):

    ```bash
    hparm -tT /dev/sda
    ```

2. Measure the write performance of a disk

    ```bash
    dd if=/dev/zero of=file_1GB bs=1024 count=1000000
    ```
