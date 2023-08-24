/**
 * Just a profile page to show Mail, Name and other boring stuff
 * We cant update user specific details as auth. is handled by firebase
 * will be shifting to using database for user details when needed
 */

import { Box, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '@/components/AuthContext';
import { Image } from '@chakra-ui/react';

export default function Profile() {
  const { user } = useAuth(); 

  return (
    <>
    <Box minH="80vh">
    <Box maxW="md" mx="auto" mt={8} p={4}>
      <Heading mb={4}>Profile</Heading>
      {user ? (
        <>
          {/* <Text>
            <strong>Name:</strong> {user.displayName}
          </Text> */}
          <Image 
          borderRadius='full'
          boxSize="150px"
          src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.uid}`}
          alt={user.email}
          ></Image>
          <Text>
            <strong>Email :</strong> {user.email}
          </Text>
          <Text>
            <strong>UUID :</strong> {user.uid}
          </Text>
        </>
      ) : (
        <Text>Please Wait while we try to sign you in or try signing in to view your profile.</Text>
      )}
      </Box>
    {/* <Footer></Footer> */}
    </Box>
    </>
  );
}
