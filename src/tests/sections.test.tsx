import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { FAQ, Services } from '../components/Sections'
import { SearchPage } from '../pages/Pages'

afterEach(() => vi.restoreAllMocks())

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

  it('searches trademarks without exposing API credentials', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({
      success: true,
      data: [{ app_number: 'DID2026000001', mark_name: 'UTERO', class: '35', owner: 'PT CONTOH', consultant: null, reg_date: '2026-01-02' }],
      pagination: { page: 1, limit: 10, total: 1 },
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }))

    render(<MemoryRouter><SearchPage /></MemoryRouter>)
    await user.type(screen.getByLabelText('Nama merek'), 'Utero')
    await user.selectOptions(screen.getByLabelText(/Kelas NICE/i), '35')
    await user.click(screen.getByRole('button', { name: 'Cari Merek' }))

    expect(globalThis.fetch).toHaveBeenCalledWith('/api/merek/search?q=Utero&page=1&limit=10&class=35', { cache: 'no-store' })
    expect(await screen.findByRole('heading', { name: 'UTERO' })).toBeVisible()
    expect(screen.getByText('PT CONTOH')).toBeVisible()
  })
})
