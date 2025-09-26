"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice, getConditionLabel, getConditionColor } from '@/lib/utils'
import { toast } from 'sonner'
import { 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Settings, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Loader2,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import { format } from 'date-fns'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListing: 0,
    totalSales: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('listings')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
        fetchDashboardData(data.user.id)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/login')
    }
  }

  const fetchDashboardData = async (userId: string) => {
    try {
      // Fetch user's listings
      const listingsRes = await fetch(`/api/listings?sellerId=${userId}`)
      const listingsData = await listingsRes.json()
      setListings(listingsData.listings || [])

      // Calculate stats
      const activeListings = listingsData.listings?.filter((l: any) => l.status === 'ACTIVE') || []
      setStats({
        totalListings: listingsData.listings?.length || 0,
        activeListing: activeListings.length,
        totalSales: 0, // TODO: Calculate from orders
        totalRevenue: 0, // TODO: Calculate from orders
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete listing')

      toast.success('Listing deleted successfully')
      fetchDashboardData(user.id)
    } catch (error) {
      toast.error('Failed to delete listing')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Total Listings</CardTitle>
                <Package className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalListings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Active Listings</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeListing}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
                <ShoppingBag className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSales}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('listings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'listings'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Listings
              </button>
              <button
                onClick={() => setActiveTab('purchases')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'purchases'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Purchases
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sales'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Sales
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'listings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Your Listings</h2>
                  <Link href="/sell">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                      <Plus className="h-4 w-4 mr-2" />
                      New Listing
                    </Button>
                  </Link>
                </div>

                {listings.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                    <p className="text-gray-600 mb-4">Start selling your PS5 games today!</p>
                    <Link href="/sell">
                      <Button>Create Your First Listing</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <div key={listing.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              {listing.images?.[0] ? (
                                <img
                                  src={listing.images[0]}
                                  alt={listing.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-2xl">🎮</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                              <p className="text-2xl font-bold text-purple-600 mt-1">
                                {formatPrice(listing.price)}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(listing.condition)}`}>
                                  {getConditionLabel(listing.condition)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {listing.views} views
                                </span>
                                <span>
                                  Listed {format(new Date(listing.createdAt), 'MMM d, yyyy')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/listings/${listing.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/listings/${listing.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteListing(listing.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'purchases' && (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
                <p className="text-gray-600 mb-4">Browse games and find great deals!</p>
                <Link href="/listings">
                  <Button>Browse Games</Button>
                </Link>
              </div>
            )}

            {activeTab === 'sales' && (
              <div className="text-center py-12">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sales yet</h3>
                <p className="text-gray-600">Your sold items will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}