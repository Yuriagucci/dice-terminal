import { useNavigate } from 'react-router-dom';

// Help Modal Component
const HelpModal = ({ isOpen, onClose }) => {
  const commands = {
    "Basic Dice Rolls": [
      { command: "xDy", description: "Roll x dice with y sides (e.g., 3d6)" },
      { command: "d%", description: "Roll a percentage die (1-100)" },
      { command: "x%y", description: "Calculate x percent of y (e.g., 50%20 = 10)" },
      { command: "xDy + m", description: "Roll x dice with y sides and add m" },
      { command: "xDy * f", description: "Roll x dice with y sides and multiply by f" },
      { command: "xDy / f", description: "Roll x dice with y sides and divide by f" },
    ],
    "Advanced Rolls": [
      { command: "n#xDy", description: "Roll n sets of x dice with y sides" },
      { command: "adY", description: "Roll with advantage (e.g., ad20)" },
      { command: "ddY", description: "Roll with disadvantage (e.g., dd20)" },
      { command: "adY + m", description: "Roll with advantage and add m" },
      { command: "ddY * f", description: "Roll with disadvantage and multiply by f" },
    ],
    "Special Commands": [
        { command: "gwf", description: "Toggle Great Weapon Fighting mode" },
        { command: "bonus", description: "Answer a D&D trivia question for luck bonus" },
        { command: "8ball", description: "Ask the magic 8-ball a question" },
        { command: "clear", description: "Clear your roll history (requires confirmation)" },
        { command: "help", description: "Show this help dialog" },
        { command: "item [tier]", description: "Roll a random magic item (optionally from specified tier)" },
    ],
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white" fontFamily="monospace">
        <ModalHeader borderBottomWidth="1px" borderColor="gray.600">
          Dice Terminal Commands
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6} overflowY="auto" maxH="70vh">
          <VStack spacing={8} align="stretch">
            {Object.entries(commands).map(([title, items]) => (
              <Box key={title}>
                <Heading as="h3" size="md" mb={4} color="green.300">
                  {title}
                </Heading>
                <VStack spacing={3} align="stretch">
                  {items.map((item, index) => (
                    <Grid
                      key={index}
                      templateColumns="150px 1fr"
                      alignItems="center"
                    >
                      <GridItem>
                        <Code colorScheme="green">{item.command}</Code>
                      </GridItem>
                      <GridItem>
                        <Text>{item.description}</Text>
                      </GridItem>
                    </Grid>
                  ))}
                </VStack>
              </Box>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};


// Main Terminal Component
const Roller = () => {

};

export default Roller;