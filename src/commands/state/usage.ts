export const usage = `\`\`\`haskell
{- set state of iris -}
state :: Maybe ActivityType -> String -> IO ()
state Playing "League of Legends"
state Nothing "League of Legends"

data ActivityType = Listening | Playing | Streaming | Watching
\`\`\``;
