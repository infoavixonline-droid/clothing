import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Separator,
} from "@chakra-ui/react"

const values = [
  {
    title: "Quality First",
    body: "Every piece is crafted from carefully sourced fabrics. We believe great clothes start with great materials.",
  },
  {
    title: "Timeless Design",
    body: "We design for longevity — silhouettes that outlast trends, colours that stay relevant season after season.",
  },
  {
    title: "Conscious Craft",
    body: "Small batches, intentional production. We'd rather make less and make it right.",
  },
]

export default function AboutPage() {
  return (
    <Box>
      {/* Hero */}
      <Box position="relative" h={{ base: "50vh", md: "60vh" }} overflow="hidden">
        <Image
          src="/about-hero.webp"
          alt="About us"
          w="full"
          h="full"
          objectFit="cover"
          fallback={<Box w="full" h="full" bg="gray.100" />}
        />
        <Box
          position="absolute"
          inset="0"
          bg="blackAlpha.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack gap="3" textAlign="center" px="4">
            <Text fontSize="xs" color="whiteAlpha.800" letterSpacing="widest" textTransform="uppercase">
              Our Story
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="black"
              color="white"
              letterSpacing="tight"
              textTransform="uppercase"
            >
              Built Around Simplicity
            </Heading>
          </VStack>
        </Box>
      </Box>

      {/* Story section */}
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8" }} py="20">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: "12", md: "20" }}
          align="center"
        >
          <Box flex="1">
            <Image
              src="/about-studio.webp"
              alt="Studio"
              w="full"
              aspectRatio="4/5"
              objectFit="cover"
              fallback={
                <Box w="full" aspectRatio="4/5" bg="bg.muted" />
              }
            />
          </Box>

          <VStack align="start" gap="6" flex="1">
            <Text fontSize="xs" color="fg.subtle" letterSpacing="widest" textTransform="uppercase">
              Who We Are
            </Text>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" letterSpacing="tight" color="fg">
              Clothing that earns a permanent place in your wardrobe.
            </Heading>
            <Text color="fg.muted" lineHeight="tall" fontSize="sm">
              MODA was born out of frustration with fast fashion — the overwhelming choice, the poor quality, the disposable mentality. We set out to build something different: a small, focused collection of everyday essentials made to last.
            </Text>
            <Text color="fg.muted" lineHeight="tall" fontSize="sm">
              Every piece we carry is chosen because it earns its place. No excess, no noise. Just well-made clothing that makes getting dressed easier.
            </Text>
            <Text color="fg.muted" lineHeight="tall" fontSize="sm">
              Based in Sri Lanka, we offer a direct, personal shopping experience. Order via WhatsApp, talk to a real person, and receive your pieces with care.
            </Text>
          </VStack>
        </Flex>
      </Box>

      {/* Values */}
      <Box bg="bg.subtle" py="20">
        <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8" }}>
          <VStack align="start" gap="2" mb="12">
            <Text fontSize="xs" color="fg.subtle" letterSpacing="widest" textTransform="uppercase">
              What We Stand For
            </Text>
            <Heading fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" letterSpacing="tight" color="fg">
              Our Values
            </Heading>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
            {values.map((v) => (
              <Box
                key={v.title}
                p="8"
                bg="bg"
                border="1px solid"
                borderColor="border.subtle"
              >
                <Heading fontSize="md" fontWeight="semibold" mb="3" color="fg">
                  {v.title}
                </Heading>
                <Text fontSize="sm" color="fg.muted" lineHeight="tall">
                  {v.body}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Stats */}
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8" }} py="20">
        <SimpleGrid columns={{ base: 2, md: 4 }} gap="8">
          {[
            { value: "2020", label: "Founded" },
            { value: "500+", label: "Happy Customers" },
            { value: "100%", label: "Cotton & Linen" },
            { value: "8", label: "Core Styles" },
          ].map((stat) => (
            <VStack key={stat.label} align="start" gap="1">
              <Separator borderColor="border.subtle" mb="3" />
              <Text fontSize="2xl" fontWeight="black" color="fg" letterSpacing="tight">
                {stat.value}
              </Text>
              <Text fontSize="xs" color="fg.muted" letterSpacing="wider" textTransform="uppercase">
                {stat.label}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
