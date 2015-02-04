from setuptools import setup, find_packages
from distutils import log
from setuptools.command.build_py import build_py as BuildPyCommand
from setuptools.command.test import test as TestCommand
from codecs import open
from os import path
import os
import sys
import subprocess

MY_PACKAGE = 'mormuvid'
CLIENT_SUBDIR = 'client'
CLIENT_DIST_SUBDIR = os.path.join(CLIENT_SUBDIR, 'dist')

# Figure out the directory where this setup.py lives.
here = path.abspath(path.dirname(__file__))

class MyBuild(BuildPyCommand):
    """Ensures that the client-side assets are built and installed too."""

    def __init__(self, *args, **kwargs):
        self.client_built = False
        return BuildPyCommand.__init__(self, *args, **kwargs)

    def __getattr__(self, attr):
        if attr == 'data_files':
            return self._get_data_files_including_client()
        return BuildPyCommand.__getattr__(self, attr)

    def _get_data_files_including_client(self):

        data = BuildPyCommand.__getattr__(self, 'data_files')

        log.info("%s: adding extra package data files from web client dist dir", MY_PACKAGE)

        self.build_client_assets()

        # Locate package source directory
        pkg_src_dir = self.get_package_dir(MY_PACKAGE)

        # Compute package build directory
        pkg_build_dir = os.path.join(*([self.build_lib] + MY_PACKAGE.split('.')))

        # Add all the files from the client dist directory
        # (which were built by run(self) using npm install)

        client_dist_src_dir = os.path.join(pkg_src_dir, CLIENT_DIST_SUBDIR)
        client_dist_build_dir = os.path.join(pkg_build_dir, CLIENT_DIST_SUBDIR)

        walk_root_path = client_dist_src_dir
        walk_root_path_strip_len = len(walk_root_path) + 1
        for dir_name, junk, files in os.walk(walk_root_path):
            rel_dir_name = dir_name[walk_root_path_strip_len:]
            dst_dir_name = os.path.join(client_dist_build_dir, rel_dir_name)
            log.info("found extra files %s in %s for %s", files, dir_name, dst_dir_name)
            data.append(
                ( MY_PACKAGE,
                  dir_name,
                  dst_dir_name,
                  files))

        return data

    def _check_client_build_commands_exist(self):
        bad = False
        try:
            if subprocess.call(['npm', 'version']) != 0:
                raise Exception("non-zero exit code returned")
        except:
            log.warn("need npm installed (part of node.js)")
            bad = True
        try:
            if subprocess.call(['compass', 'version']) != 0:
                raise Exception("non-zero exit code returned")
        except:
            log.warn("need compass & sass installed (ruby gems)")
            bad = True
        if bad:
            from distutils.errors import DistutilsError
            raise DistutilsError("client build commands not found")

    def build_client_assets(self):

        if self.client_built:
            log.info("%s: already built web client assets", MY_PACKAGE)
            return

        log.info("%s: building web client assets", MY_PACKAGE)

        self._check_client_build_commands_exist()

        client_dir = os.path.join(MY_PACKAGE, CLIENT_SUBDIR)

        client_build_command_line = ['npm', 'install']

        if not self.dry_run:
            log.info("running %s from %s", client_build_command_line, client_dir)
            subprocess.call(client_build_command_line, cwd=client_dir)
        else:
            log.info("not actually running %s from %s", client_build_command_line, client_dir)

        self.client_built = True

    def run(self):
        self.build_client_assets()
        BuildPyCommand.run(self)

class PyTest(TestCommand):
    user_options = [('pytest-args=', 'a', "Arguments to pass to py.test")]

    def initialize_options(self):
        TestCommand.initialize_options(self)
        self.pytest_args = ['mormuvid/test']

    def finalize_options(self):
        TestCommand.finalize_options(self)
        self.test_args = []
        self.test_suite = True

    def run_tests(self):
        #import here, cause outside the eggs aren't loaded
        import pytest
        errno = pytest.main(self.pytest_args)
        sys.exit(errno)

# Get the long description from the relevant file
with open(path.join(here, 'README.rst'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='mormuvid',

    # Versions should comply with PEP440.  For a discussion on single-sourcing
    # the version across setup.py and the project code, see
    # http://packaging.python.org/en/latest/tutorial.html#version
    version='0.1.0',

    description='Automatically Downloads Popular Music Videos',
    long_description=long_description,

    # The project's main homepage.
    url='https://github.com/kieranelby/mormuvid',

    # Author details
    author='Kieran Elby',
    author_email='kieran@dunelm.org.uk',

    # Choose your license
    license='MIT',

    # See https://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        # How mature is this project? Common values are
        #   3 - Alpha
        #   4 - Beta
        #   5 - Production/Stable
        'Development Status :: 3 - Alpha',

        # Indicate who your project is intended for
        'Intended Audience :: End Users/Desktop',
        'Topic :: Internet :: WWW/HTTP :: Indexing/Search',
        'Topic :: Multimedia :: Video',
        'Topic :: Multimedia :: Sound/Audio',

        # Pick your license as you wish (should match "license" above)
        'License :: OSI Approved :: MIT License',

        # Specify the Python versions you support here. In particular, ensure
        # that you indicate whether you support Python 2, Python 3 or both.
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7'
    ],

    # What does your project relate to?
    keywords='download music videos',

    # List run-time dependencies here.  These will be installed by pip when your
    # project is installed. For an analysis of "install_requires" vs pip's
    # requirements files see:
    # https://packaging.python.org/en/latest/technical.html#install-requires-vs-requirements-files
    # NB - installing rtmpdump would be good too for some videos ...
    install_requires=[
        'pytest>=2.6.4',
        'Jinja2>=2.6',
        'beautifulsoup4>=4.3.2',
        'requests>=2.3.0',
        'pykka>=1.2.0',
        'youtube-dl>=2015.01.16',
        'bottle>=0.12.7',
        'wsgi-request-logger>=0.4.1',
        'jsonpickle>=0.8.0',
        'appdirs>=1.4.0',
        'gevent>=1.0.1',
        'gevent-websocket>=0.9.3'
    ],

    packages=find_packages(),
    # Sigh. This doesn't seem to work very well for this project.
    include_package_data=False,

    # Although 'package_data' is the preferred approach, in some case you may
    # need to place data files outside of your packages.
    # see http://docs.python.org/3.4/distutils/setupscript.html#installing-additional-files
    # In this case, 'data_file' will be installed into '<sys.prefix>/my_data'
    ##data_files=[('my_data', ['data/data_file'])],

    # To provide executable scripts, use entry points in preference to the
    # "scripts" keyword. Entry points provide cross-platform support and allow
    # pip to create the appropriate form of executable for the target platform.
    entry_points={
        'console_scripts': [
            'mormuvid=mormuvid.command_line:main',
        ],
    },

    # Use pytest for tests.
    tests_require=['pytest'],
    cmdclass = {'test': PyTest, 'build_py': MyBuild}
)
