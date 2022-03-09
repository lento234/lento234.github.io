# Slurm: Usage guide for HPC Job Scheduler

**Last updated**: October 27, 2021

## Administrative commands

- Change the state of `node02`:

        scontrol update nodename=node02 state=resume

- Show partitions, nodes

        scontrol show partition
        scontrol show nodes

- Show status of slurm

        sinfo

- Report only down, drained of draining nodes and their reason

        sinfo -R


## User commands

- Run one task on a given partition with 3 nodes

        srun --nodes=3 --partition=cluster hostname

- Run one task on a specific node list

        srun --nodelist=node01,node02 hostname

- Run multiple task on a single node

        srun --ntasks-per-node=4 hostname

- Submit a batch job

        sbatch submit.job

Contents of of the `submit.job`

```bash
#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=4
#SBATCH --partition=cluster

cd $SLURM_SUBMIT_DIR

srun echo "Hello, World!"
```
