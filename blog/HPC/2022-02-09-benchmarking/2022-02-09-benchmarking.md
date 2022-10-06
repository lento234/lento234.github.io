# A guide on basic benchmarking

**Last updated**: February 9, 2022

## Storage

* Perform timings of device/cache reads on device (`sda`):

    ```bash
    hparm -tT /dev/sda
    ```

* Measure the write performance of a disk

    ```bash
    dd if=/dev/zero of=file_1GB bs=1024 count=1000000 conv=fdatasync
    ```

* Benchmark with [IOzone](http://www.iozone.org/) filesystem benchmarking tool and export to `xls`

    ```bash
    iozone -a /dev/sdb1 -b results.xls
    ```

## Network

* Testing internet bandwidth

    ```bash
    speedtest-cli
    ```

* Measuring bandwidth *between* two computer:

    * Server-side (default port: `5001`):

        ```bash
        iperf -s
        ```

    * Client-side:

        ```bash
        iperf -c server_ip
        ```
