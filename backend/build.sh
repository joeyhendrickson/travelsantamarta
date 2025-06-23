#!/bin/bash

# Set environment variables to avoid Rust compilation issues
export CARGO_HOME=/tmp/cargo
export RUSTUP_HOME=/tmp/rustup
export PATH="$CARGO_HOME/bin:$PATH"

# Install Rust if not present
if ! command -v rustc &> /dev/null; then
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable
    source $CARGO_HOME/env
fi

# Install Python dependencies
pip install -r requirements.txt 