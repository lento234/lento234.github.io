# Installing h5py with Parallel HDF5

**Last updated**: April 1, 2021

The following guide is if you want to install h5py with parallel (mpi) IO features. Therefore, h5py also requires a system-mpi linked `mpi4py` installation as well.

**Installation:**

1. Load the current latest parallel `HDF5` module (e.g. `HDF5/1.10.6-CrayGNU-20.11-parallel`).

    ```bash
    module load HDF5/1.10.6-CrayGNU-20.11-parallel
    ```

2. Update environment variables

    ```bash
    export MPI_DIR=$MPICH_DIR
    export MPI_INCLUDE=$MPICH_DIR/include
    export MPI_LIB=$MPICH_DIR/lib
    export LB_LIBRARY_PATH=$MPI_DIR/lib:$LD_LIBRARY_PATH
    export MPICC=CC
    export mpicc=CC

    export HDF5_MPI="ON"
    export HDF5_DIR=/apps/daint/UES/jenkins/7.0.UP02-20.11/gpu/easybuild/software/HDF5/1.10.6-CrayGNU-20.11-parallel
    ```

3. Install h5py from [source](https://github.com/h5py/h5py).

    a. Clone repo locally:

    ```bash
    git clone https://github.com/h5py/h5py
    ```

    b. Update the `setup_build.py` file with the additional following `include_dirs`:

    ```python
    settings['include_dirs'] += ['/opt/cray/pe/mpt/7.7.16/gni/mpich-gnu/8.2/include/']
    ```

    c. Install from locally using `pip`:

    ```bash
    pip install .
    ```

**Testing:**

Test h5py parallel build using following example script (`parallel_h5py.py`):

```python
from mpi4py import MPI
import h5py

comm = MPI.COMM_WORLD
rank = comm.rank
size = comm.size

f = h5py.File('parallel_test.hdf5', 'w', driver='mpio', comm=MPI.COMM_WORLD)

dset = f.create_dataset('test', (size,), dtype='i')
dset[rank] = rank

f.close()
```

1. Load system `HDF5/xxx-parallel` and your custom python environment with `h5py` and `mpi4py`. Run `parallel_h5py.py` script:

    ```bash
    srun python parallel_h5py.py
    ```

2. Inspect output:

    ```bash
    h5dump parallel_test.h5
    ```
