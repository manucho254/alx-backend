#!/usr/bin/env python3
""" function named index_range that,
   takes two integer arguments page and page_size.

   The function should return a tuple of size two
   containing a start index and an end index corresponding
   to the range of indexes to return in a list for
   those particular pagination parameters.
"""


def index_range(page: int, page_size: int) -> tuple:
    """ get index range
       Args:
           page: current page
           page_size: size of page
       Return:
             tuple with index range
    """
    if page == 0:
        return (0, 0)

    if page == 1:
        return (0, page_size)

    last_page = (page - 1) * page_size
    return (last_page, last_page + page_size)
