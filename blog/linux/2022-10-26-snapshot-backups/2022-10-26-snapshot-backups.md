# Quick and simple snapshot backuping using rsync

    The 3-2-1 rule can aid in the backup process. It states that there should be at least 3 copies of the data, stored on 2 different types of storage media, and one copy should be kept offsite, in a remote location.

    - Wikipedia on Backup

References:

- https://en.wikipedia.org/wiki/Backup


## Step 1: Make a rsync snapshot

We first make a snapshot of whatever folder you are interested. In this example, we take a snapshot of the home directory (`/home/`) to a mounted external device mounted at `/mnt/backup`.

```bash
rsync -avhux --delete /home/ /mnt/backup/snap-latest/
```

The `--delete` option is used to ensure it's a literal snapshot and unwanted files are also removed. Ideally, we should periodically and **automatically** perform this command, e.g. using a `cron` job. Add the following line by editing the crontab, `crontab -e`:

```bash
0 12 * * 6 rsync -avhux --delete --info=stats2 /home/ /mnt/backup/snap-latest/ >/mnt/backup/logs/snap-"$(date +'\%Y\%m\%d')".log 2>&1
```

We now scheduled it for saturday (i.e., `6`) at noon and also log the transfer to a log file with a timestamp.

## Step 2: Make a compressed backup

Once, we have a snapshot clone of our `/home/` dir, we can also periodically make a compressed backup of the snapshot. All we need is to tar and compress the latest snapshot with the timestamp of the snapshot:

```bash
tar -cvzf /mnt/backup/snap-"$(date +'\%Y\%m\%d')".tgz --directory=/mnt/backup/snap-latest/ .
```

Ideally, we can now make a backup of the compressed file to another backup device. Like with `rsync`, we can schedule the compressing and ideally we do it once a month:

```bash
0 0 1 * * tar -cvzf /mnt/backup/snap-"$(date +'\%Y\%m\%d')".tgz --directory=/mnt/backup/snap-latest/ . >/mnt/backup/logs/tar-"$(date +'\%Y\%m\%d')".log 2>&1
```

We perfom the command again with `cron`, at first day of the month (`1`).
