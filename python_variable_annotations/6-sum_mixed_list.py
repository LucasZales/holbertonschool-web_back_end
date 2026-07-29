#!/usr/bin/env python3
"""Sum mixed list module."""

from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """Return the sum of a mixed list."""
    return float(sum(mxd_lst))
