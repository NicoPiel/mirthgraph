'use client'
import {Inter} from '@next/font/google'
import Grid from '@mui/material/Unstable_Grid2'
import {Box, Link} from '@mui/material'

const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <main>
      <Box>
        <Grid container spacing={2}>
          <Grid xs/>
          <Grid xs={4}>
            <Link href="/graph">Graph</Link>
          </Grid>
          <Grid xs={4}>
            <Link href="/ports">Ports</Link>
          </Grid>
          <Grid xs/>
        </Grid>
      </Box>
    
    </main>
  )
}
