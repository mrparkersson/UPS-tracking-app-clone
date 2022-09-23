import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParam } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '../navigator/RootNavigator';
import { Image, Input } from '@rneui/themed';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphql/queries';
import CustomerCard from '../components/CustomerCard';

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParam, 'Customers'>,
  NativeStackNavigationProp<RootStackParam>
>;

const CustormersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const { data, loading, error } = useQuery(GET_CUSTOMERS);
  const [inputText, setInputText] = useState<string>('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#59c1cc' }}>
      <Image
        source={{ uri: 'https://links.papareact.com/3jc' }}
        containerStyle={tw('w-full h-64')}
      />
      <Input
        placeholder="Search by Customer"
        value={inputText}
        onChangeText={setInputText}
        containerStyle={tw(' bg-white pt-5 pb-0 px-10')}
      />

      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.includes(inputText)
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => {
          return (
            <CustomerCard key={ID} email={email} name={name} userId={ID} />
          );
        })}
    </ScrollView>
  );
};

export default CustormersScreen;
