#!/usr/bin/env python3
"""To kv module."""

from typing import Tuple, Union


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Return a tuple."""
    return (k, float(v ** 2))
