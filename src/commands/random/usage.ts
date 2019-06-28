export const usage = `\`\`\`haskell
{- returns random int -}
random :: Maybe () -> Int
random Nothing -- 0 ~ 4294967295

random :: Int -> Int
random 10      -- 0 ~ 9

random :: Int -> Int -> Int
random 14 23   -- 14 ~ 22

random :: [String] -> String
random ["엄지", "검지", "중지", "약지", "새끼"]
\`\`\``;
