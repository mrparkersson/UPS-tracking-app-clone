import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../graphql/queries';

const useCustomerOrders = (userId: string) => {
  const { data, loading, error } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;

    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      Address: value.Address,
      trackingId: value.trackingId,
      shippingCost: value.shippingCost,
      createdAt: value.createdAt,
      carrier: value.carrier,
      Lng: value.Lng,
      Lat: value.Lat,
      City: value.City,
      trackingItems: value.trackingItems,
    }));

    const customerOrders = orders.filter(
      (order) => order.trackingItems.customer_id === userId
    );

    setOrders(customerOrders);
  }, [data, userId]);

  return { loading, orders, error };
};

export default useCustomerOrders;
