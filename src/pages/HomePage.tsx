import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  SimpleGrid,
  HStack,
  VStack,
  Image,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import products from "../data/products.json"
import ProductCard from "../components/ProductCard"

const mostPicked = products.filter((p) => p.mostPicked)
const bestSelling = products.filter((p) => p.bestSelling)
const latest = [...products]
  .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
  .slice(0, 4)

export default function HomePage() {
  return (
    <Box>
      {/* Hero */}
      <Box position="relative" h={{ base: "85vh", md: "90vh" }} overflow="hidden">
        <Image
          src="/hero.webp"
          alt="Hero"
          w="full"
          h="full"
          objectFit="cover"
          fallback={
            <Box w="full" h="full" bg="gray.100" />
          }
        />
        <Box
          position="absolute"
          inset="0"
          bg="blackAlpha.400"
          display="flex"
          alignItems="flex-end"
        >
          <Box maxW="7xl" mx="auto" px={{ base: "6", md: "12" }} pb={{ base: "16", md: "24" }} w="full">
            <VStack align="start" gap="6" maxW="xl">
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight="black"
                letterSpacing="tight"
                color="white"
                lineHeight="shorter"
                textTransform="uppercase"
              >
                Effortless<br />Style,<br />Every Day.
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.900" maxW="sm">
                Minimal clothing designed to last. Clean lines, quality fabrics, and a wardrobe that works harder so you don't have to.
              </Text>
              <Link to="/store" style={{ textDecoration: "none" }}>
                <Button
                  size="lg"
                  bg="white"
                  color="black"
                  _hover={{ bg: "gray.100" }}
                  borderRadius="none"
                  fontSize="xs"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  px="8"
                >
                  Shop Now
                </Button>
              </Link>
            </VStack>
          </Box>
        </Box>
      </Box>

      {/* Most Picked */}
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8" }} pt="24" pb="16">
        <SectionHeader label="Most Picked" linkTo="/store" />
        <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" mt="8">
          {mostPicked.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Latest Products */}
      <Box bg="bg.subtle" py="16">
        <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8" }}>
          <SectionHeader label="Latest Arrivals" linkTo="/store" />
          <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" mt="8">
            {latest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Best Selling */}
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8" }} py="16">
        <SectionHeader label="Best Selling" linkTo="/store" />
        <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" mt="8">
          {bestSelling.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Banner strip */}
      <Box bg="fg" py="10">
        <Flex
          maxW="7xl"
          mx="auto"
          px={{ base: "4", md: "8" }}
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap="6"
        >
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="bg" letterSpacing="tight">
              Free shipping on orders over Rs. 8,000
            </Text>
            <Text fontSize="sm" color="bg.muted">
              WhatsApp us to order — fast, easy, personal.
            </Text>
          </Box>
          <Link to="/store" style={{ textDecoration: "none" }}>
            <Button
              variant="outline"
              borderColor="bg"
              color="bg"
              _hover={{ bg: "bg", color: "fg" }}
              borderRadius="none"
              fontSize="xs"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              Browse All
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  )
}

function SectionHeader({
  label,
  linkTo,
}: {
  label: string
  linkTo: string
}) {
  return (
    <HStack justify="space-between" align="baseline">
      <Heading fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" letterSpacing="tight" color="fg">
        {label}
      </Heading>
      <Link to={linkTo} style={{ textDecoration: "none" }}>
        <Text
          fontSize="xs"
          color="fg.muted"
          letterSpacing="wider"
          textTransform="uppercase"
          _hover={{ color: "fg" }}
          transition="color 0.15s"
        >
          View All →
        </Text>
      </Link>
    </HStack>
  )
}
