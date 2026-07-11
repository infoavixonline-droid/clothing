import { Box, Flex, HStack, Text, Icon, Badge, IconButton } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { LuShoppingBag, LuMenu, LuX } from "react-icons/lu"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import { STORE_NAME } from "../lib/config"

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Store", to: "/store" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
]

export default function Navbar() {
  const { getTotalItems } = useCart()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems = getTotalItems()

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="bg"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: "4", md: "8" }}
        h="16"
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text
            fontSize="xl"
            fontWeight="black"
            letterSpacing="widest"
            color="fg"
            textTransform="uppercase"
          >
            {STORE_NAME}
          </Text>
        </Link>

        {/* Desktop nav */}
        <HStack gap="8" display={{ base: "none", md: "flex" }}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} style={{ textDecoration: "none" }}>
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={location.pathname === link.to ? "fg" : "fg.muted"}
                letterSpacing="wide"
                textTransform="uppercase"
                _hover={{ color: "fg" }}
                transition="color 0.15s"
                borderBottom={
                  location.pathname === link.to ? "1px solid" : "none"
                }
                borderColor="fg"
                pb="0.5"
              >
                {link.label}
              </Text>
            </Link>
          ))}
        </HStack>

        {/* Cart + mobile menu */}
        <HStack gap="2">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <Box position="relative" display="inline-flex">
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Cart"
                color="fg"
              >
                <Icon as={LuShoppingBag} boxSize="5" />
              </IconButton>
              {totalItems > 0 && (
                <Badge
                  position="absolute"
                  top="-1"
                  right="-1"
                  borderRadius="full"
                  bg="fg"
                  color="bg"
                  fontSize="2xs"
                  minW="4"
                  h="4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  px="1"
                >
                  {totalItems}
                </Badge>
              )}
            </Box>
          </Link>
          <IconButton
            display={{ base: "flex", md: "none" }}
            variant="ghost"
            size="sm"
            aria-label="Menu"
            color="fg"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon as={mobileOpen ? LuX : LuMenu} boxSize="5" />
          </IconButton>
        </HStack>
      </Flex>

      {/* Mobile menu */}
      {mobileOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          borderTop="1px solid"
          borderColor="border.subtle"
          bg="bg"
          px="4"
          py="4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ textDecoration: "none" }}
              onClick={() => setMobileOpen(false)}
            >
              <Text
                py="3"
                fontSize="sm"
                fontWeight="medium"
                letterSpacing="wide"
                textTransform="uppercase"
                color={location.pathname === link.to ? "fg" : "fg.muted"}
                borderBottom="1px solid"
                borderColor="border.subtle"
              >
                {link.label}
              </Text>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  )
}
