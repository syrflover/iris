export const usage = `\`\`\`haskell
{- not require say command
   expires in after one hour from the last message -}
sayEnable :: Maybe CharacterName -> IO ()
sayEnable "--yuna"
sayEnable Nothing -- default is yuna

type CharacterName = String
\`\`\``;
