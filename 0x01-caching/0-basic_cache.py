#!/usr/bin/env python3
""" Basic dictionary
"""

BaseCaching = __import__("base_caching").BaseCaching


class BasicCache(BaseCaching):
    """BaseCache class tha inherits from BaseCaching"""

    def put(self, key, item):
        """Add an item in the cache
        Args:
            key: item key
            item: item value
        """
        if key is None or item is None:
            return

        data = self.__dict__
        data["cache_data"].update({key: item})

        self.__dict__.update(data)

    def get(self, key):
        """Get an item by key
        Args:
            key: item key
        """
        data = self.__dict__

        if key is None or not data["cache_data"].get(key):
            return None

        return data["cache_data"].get(key)
