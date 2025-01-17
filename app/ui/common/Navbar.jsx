import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './Routes';

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const logout = () => {
    Meteor.logout(() => {
      navigate(RoutePaths.ROOT);
    });
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('blue.200', 'blue.900')}
        align="center"
      >
        <Flex flex={{ base: 1 }} justify="start">
          <Text
            textAlign="left"
            fontFamily="heading"
            color={useColorModeValue('gray.800', 'white')}
          >
            <Link
              bgGradient="linear(to-l, #675ABA, #4399E1)"
              bgClip="text"
              onClick={() => navigate(RoutePaths.ROOT)}
            >
              Simple Tasks
            </Link>
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Moon Icon' : 'Sun Icon'}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          {user && (
            <Button fontSize="sm" fontWeight={400} onClick={logout}>
              Sign Out
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
