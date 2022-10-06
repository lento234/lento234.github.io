# How to setup a systemd timer

**Last updated**: March 10, 2022

[Timers](https://wiki.archlinux.org/title/Systemd/Timers) are systemd unit files that can execute commands similar to cron jobs.


## Example: Setup a timer to notify if system is up

1. Setup a notify script to send notification to mattermost:

    `/opt/notify/notify_up.sh`
    ```bash
    #!/bin/env bash

    WEBHOOK_URL=https://mattermost.myserver.ch/hooks/hookurl

    curl -i -X POST -H 'Content-Type: application/json' -d '{"text": ":sparkles: **I am back online** :sparkles: :sunglasses::+1:"}' $WEBHOOK_URL > /dev/null
    ```

2. Setup a timer unit file

    `/usr/lib/systemd/system/notify_up.timer`
    ```
    [Unit]
    Description=Notify server is back online
    Wants=network-online.target sshd.service

    [Timer]
    OnBootSec=5min
    Unit=notify_up.service

    [Install]
    WantedBy=timers.target
    ```

3. Setup the service unit file:

    `/usr/lib/systemd/system/notify_up.service`
    ```
    [Unit]
    Description=Notify server is back online
    After=network-online.target sshd.service

    [Service]
    Type=oneshot
    ExecStart=/opt/notify/notify_up.sh
    ```

4. Reload systemd:

    `systemctl daemon-reload`

5. Enable and start the timer unit file:

    ```
    systemctl enable notify_up.timer
    systemctl start notify_up.timer
    ```

6. Show list of timers:


    ```bash
    $ systemctl list-timers --all

    NEXT                        LEFT          LAST                        PASSED       UNIT                         ACTIVATES
    Thu 2022-03-10 15:33:45 CET 30min left    Thu 2022-03-10 14:30:30 CET 32min ago    anacron.timer                anacron.service
    Thu 2022-03-10 17:38:57 CET 2h 36min left Wed 2022-03-09 22:18:37 CET 16h ago      apt-daily.timer              apt-daily.service
    Thu 2022-03-10 19:00:23 CET 3h 57min left Thu 2022-03-10 09:02:59 CET 5h 59min ago fwupd-refresh.timer          fwupd-refresh.service
    Thu 2022-03-10 19:02:13 CET 3h 59min left Thu 2022-03-10 12:39:48 CET 2h 23min ago ua-timer.timer               ua-timer.service
    Thu 2022-03-10 23:56:18 CET 8h left       Thu 2022-03-10 06:50:02 CET 8h ago       motd-news.timer              motd-news.service
    Fri 2022-03-11 00:00:00 CET 8h left       Thu 2022-03-10 00:00:02 CET 15h ago      logrotate.timer              logrotate.service
    Fri 2022-03-11 00:00:00 CET 8h left       Thu 2022-03-10 00:00:02 CET 15h ago      man-db.timer                 man-db.service
    Fri 2022-03-11 06:58:28 CET 15h left      Thu 2022-03-10 06:50:38 CET 8h ago       apt-daily-upgrade.timer      apt-daily-upgrade.service
    Fri 2022-03-11 10:06:01 CET 19h left      Thu 2022-03-10 10:06:01 CET 4h 56min ago systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
    Sun 2022-03-13 03:10:30 CET 2 days left   Sun 2022-03-06 03:10:13 CET 4 days ago   e2scrub_all.timer            e2scrub_all.service
    Mon 2022-03-14 00:00:00 CET 3 days left   Mon 2022-03-07 00:00:22 CET 3 days ago   fstrim.timer                 fstrim.service
    n/a                         n/a           Wed 2022-03-09 09:55:24 CET 1 day 5h ago notify_up.timer              notify_up.service
    n/a                         n/a           n/a                         n/a          snapd.snap-repair.timer      snapd.snap-repair.service
    n/a                         n/a           n/a                         n/a          ua-license-check.timer       ua-license-check.service

    14 timers listed.
    ```
