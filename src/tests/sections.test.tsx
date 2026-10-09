import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { FAQ, Services } from '../components/Sections'

describe('interactive sections', () => {
  it('opens and closes FAQ answers accessibly', async () => {
    const user = userEvent.setup()
    render(<FAQ />)
    const first = screen.getByRole('button', { name: /apa itu pendaftaran merek/i })
    expect(first).toHaveAttribute('aria-expanded', 'true')
    await user.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders service destinations as real links', () => {
    render(<MemoryRouter><Services /></MemoryRouter>)
    expect(screen.getByRole('link', { name: /pendaftaran merek/i })).toHaveAttribute('href', '/pendaftaran-merek/')
  })
})
