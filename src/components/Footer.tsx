import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Icon,
  Separator,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { LuInstagram, LuFacebook, LuPhone } from "react-icons/lu"
import { STORE_NAME, STORE_TAGLINE, WHATSAPP_NUMBER } from "../lib/config"

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Store", to: "/store" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor="border.subtle"
      bg="bg"
      mt="24"
    >
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8" }} py="12">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: "10", md: "0" }}
          justify="space-between"
        >
          {/* Brand */}
          <VStack align="start" gap="3" maxW="xs">
            <Text
              fontSize="xl"
              fontWeight="black"
              letterSpacing="widest"
              textTransform="uppercase"
              color="fg"
            >
              {STORE_NAME}
            </Text>
            <Text fontSize="sm" color="fg.muted" lineHeight="tall">
              {STORE_TAGLINE}
            </Text>
          </VStack>

          {/* Quick links */}
          <VStack align="start" gap="3">
            <Text
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="widest"
              textTransform="uppercase"
              color="fg.subtle"
            >
              Quick Links
            </Text>
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} style={{ textDecoration: "none" }}>
                <Text
                  fontSize="sm"
                  color="fg.muted"
                  _hover={{ color: "fg" }}
                  transition="color 0.15s"
                >
                  {link.label}
                </Text>
              </Link>
            ))}
          </VStack>

          {/* Social */}
          <VStack align="start" gap="3">
            <Text
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="widest"
              textTransform="uppercase"
              color="fg.subtle"
            >
              Follow Us
            </Text>
            <HStack gap="4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  as={LuInstagram}
                  boxSize="5"
                  color="fg.muted"
                  _hover={{ color: "fg" }}
                  transition="color 0.15s"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  as={LuFacebook}
                  boxSize="5"
                  color="fg.muted"
                  _hover={{ color: "fg" }}
                  transition="color 0.15s"
                />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  as={LuPhone}
                  boxSize="5"
                  color="fg.muted"
                  _hover={{ color: "fg" }}
                  transition="color 0.15s"
                />
              </a>
            </HStack>
          </VStack>
        </Flex>

        <Separator my="8" borderColor="border.subtle" />

        <Text fontSize="xs" color="fg.subtle" textAlign="center">
          &copy; {year} {STORE_NAME}. All rights reserved.
        </Text>
      </Box>
    </Box>
  )
}
