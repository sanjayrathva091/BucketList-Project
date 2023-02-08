import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

// Replace test data with your own
const data = [
  {
    title: 'Easy Accessibility',
    text: 'Keep all your to-dos at your finger tips',
  },
  {
    title: 'Improves your task performance',
    text: 'Having task organized and managed properly will improve your performance',
  },
  {
    title: 'Registration and login',
    text: 'Now you can register and login with your account and store all your to-dos in your basket',
  },
  {
    title: 'Upload your profile picture',
    text: 'Able to upload your profile picture as well',
  },
  {
    title: 'Responsive Design',
    text: 'You can use this platform to mobile, tablet and desktop screen-sizes',
  },
  {
    title: 'Feedback',
    text: 'You can write feedback to us anytime',
  },
  {
    title: 'Full Stack Project',
    text: 'Tech stacks: ReactJs, Redux, Chakra-UI for front end development and NodeJs, ExpressJs and MongoDB for backend development',
  },
];
const features = Array.apply(null, data).map(function (x, i) {
  return {
    id: i,
    title: x.title,
    text: x.text,
  };
});

export default function AboutPage() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>About the project</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          BucketList is an online to-do's management tool. Leave all your
          worries to us we've got your back!
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map(feature => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
