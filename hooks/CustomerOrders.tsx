import { Text } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../graphql/queries';

const CustomerOrders = () => {
  const { data, loading, error } = useQuery<>(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (loading) {
      return <Text>Loading...</Text>;
    }

    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      Address: value.Address,
      trackingId: value.trackingId,
      shippingCost: value.shippingCost,
      createdAt: value.createdAt,
      carrier: value.carrier,
      Lng: value.Lng,
      Lat: value.Lat,
      City: value.City,
    }));

    setOrders(orders);
  }, [data]);

  return (
    <SafeAreaView>
      <Text>CustomerOrders</Text>
    </SafeAreaView>
  );
};

export default CustomerOrders;
