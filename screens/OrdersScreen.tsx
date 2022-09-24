import { View, Text, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '../navigator/RootNavigator';
import { TabParam } from '../navigator/TabNavigator';
import { useTailwind } from 'tailwind-rn/dist';
import UseOrders from '../hooks/UseOrders';
import { Image, Button } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParam, 'Orders'>,
  NativeStackNavigationProp<RootStackParam>
>;

const OrderScreen = () => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const tw = useTailwind();

  const { loading, error, orders } = UseOrders();

  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? '#eb6a7c' : color, fontSize: 10 }}>
          Orders
        </Text>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#eb6a7c' }}>
      <Image
        source={{ uri: 'https://links.papareact.com/m51' }}
        containerStyle={tw('w-full h-64')}
      />
      <View>
        <Button
          color="pink"
          titleStyle={{ color: 'gray', fontWeight: '400' }}
          style={tw('py-2 px-5')}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? 'Showing: Oldest First' : 'Showing: Most Recent First'}
        </Button>

        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} order={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrderScreen;
