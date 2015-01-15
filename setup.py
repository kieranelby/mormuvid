from setuptools import setup, find_packages  # Always prefer setuptools over distutils
from setuptools.command.test import test as TestCommand
from codecs import open  # To use a consistent encoding
from os import path
import os
import sys

here = path.abspath(path.dirname(__file__))

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

def recursive_file_list(dir):
    matches = []
    for root, dirnames, filenames in os.walk(dir):
        for filename in filenames:
            matches.append(os.path.join(root, filename))
    return matches

# Sigh.
mormuvid_client_dist_files = \
  [path.relpath(x, path.join(here, 'mormuvid')) for x in \
    recursive_file_list(path.join(here, 'mormuvid', 'client', 'dist'))]

setup(
    name='mormuvid',

    # Versions should comply with PEP440.  For a discussion on single-sourcing
    # the version across setup.py and the project code, see
    # http://packaging.python.org/en/latest/tutorial.html#version
    version='0.0.1',

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
        'Topic :: Software Development :: Build Tools',

        # Pick your license as you wish (should match "license" above)
        'License :: OSI Approved :: MIT License',

        # Specify the Python versions you support here. In particular, ensure
        # that you indicate whether you support Python 2, Python 3 or both.
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
    ],

    # What does your project relate to?
    keywords='download music videos',

    # You can just specify the packages manually here if your project is
    # simple. Or you can use find_packages().
    packages=['mormuvid'],

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
        'youtube-dl>=2015.01.15',
        'subprocess32>=3.2.6',
        'cherrypy>=3.3.0',
        'bottle>=0.12.7',
        'jsonpickle>=0.8.0',
        'appdirs>=1.4.0'
    ],

    # TODO - explain
    include_package_data=False,
    package_data={
        'mormuvid': mormuvid_client_dist_files + [
        ],
    },

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
    cmdclass = {'test': PyTest},
)
