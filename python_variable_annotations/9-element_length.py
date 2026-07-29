#!/usr/bin/env python3
"""Element length module."""

from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """Return elements with their lengths."""
    return [(i, len(i)) for i in lst]
