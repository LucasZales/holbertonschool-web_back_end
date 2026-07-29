#!/usr/bin/env python3
"""Make multiplier module."""

from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Return a multiplier function."""
    def multiply(n: float) -> float:
        """Multiply a number."""
        return n * multiplier

    return multiply
