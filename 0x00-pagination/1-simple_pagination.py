#!/usr/bin/env python3
""" method named get_page that takes two integer arguments
    page with default value 1 and page_size with default value 10.

    You have to use this CSV file
    (same as the one presented at the top of the project)
    Use assert to verify that both arguments are integers greater than 0.
    Use index_range to find the correct indexes to paginate the
    dataset correctly and return the appropriate page of
    the dataset (i.e. the correct list of rows).
    If the input arguments are out of range for the dataset,
    an empty list should be returned.

"""

import csv
import math
from typing import List


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


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """ initialize class
        """
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
                self.__dataset = dataset[1:]
            return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """  get data from page
             Args:
                 page: page number
                 page_size: size of page
             Return:
                   an array of arrays
        """
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page_size >= 1 and page >= 1

        self.dataset()  # get data
        start, end = index_range(page, page_size)

        return self.__dataset[start:end]
