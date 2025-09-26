"use client"

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice, getConditionLabel, getConditionColor } from '@/lib/utils'
import { toast } from 'sonner'
import { 
  ShoppingCart, 
  MessageSquare, 
  Shield, 
  Star, 
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  Package,
  Heart
} from 'lucide-react'
import { format } from 'date-fns'

export default function ListingDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchListing()
    fetchUser()
  }, [resolvedParams.id])

  const fetchListing = async () => {
    try {
      const res = await fetch(`/api/listings/${resolvedParams.id}`)
      if (!res.ok) throw new Error('Listing not found')
      const data = await res.json()
      setListing(data)
    } catch (error) {
      console.error('Failed to fetch listing:', error)
      toast.error('Failed to load listing')
      router.push('/listings')
    } finally {
      setLoading(false)
    }
  }

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      setUser(data.user)
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart')
      router.push('/login')
      return
    }

    // TODO: Implement cart functionality
    toast.success('Added to cart!')
  }

  const handleBuyNow = async () => {
    if (!user) {
      toast.error('Please login to purchase')
      router.push('/login')
      return
    }

    // TODO: Implement checkout
    router.push(`/checkout?listing=${listing.id}`)
  }

  const handleContactSeller = async () => {
    if (!user) {
      toast.error('Please login to contact seller')
      router.push('/login')
      return
    }

    // TODO: Implement messaging
    router.push(`/messages?to=${listing.seller.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-12 bg-gray-200 rounded w-1/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return null
  }

  const images = listing.images?.length > 0 ? listing.images : [null]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Link href="/listings" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
            <ChevronLeft className="h-4 w-4" />
            Back to listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                {images[currentImageIndex] ? (
                  <img
                    src={images[currentImageIndex]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <span className="text-8xl">🎮</span>
                  </div>
                )}
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((img: string | null, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-purple-600' : 'border-gray-200'
                      }`}
                    >
                      {img ? (
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-2xl">🎮</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Listing Details */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(listing.condition)}`}>
                  {getConditionLabel(listing.condition)}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>
              
              <div className="text-4xl font-bold text-purple-600 mb-6">
                {formatPrice(listing.price)}
              </div>

              <div className="space-y-3 mb-6">
                <Button 
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                  size="lg"
                  disabled={listing.status !== 'ACTIVE'}
                >
                  Buy Now
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={handleAddToCart}
                    variant="outline"
                    disabled={listing.status !== 'ACTIVE'}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline"
                    disabled={!user}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{listing.description}</p>
              </div>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Seller Information</h3>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {listing.seller.avatar ? (
                        <img src={listing.seller.avatar} alt="" className="w-full h-full rounded-full" />
                      ) : (
                        <User className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{listing.seller.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Joined {format(new Date(listing.seller.createdAt), 'MMM yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          {listing.seller._count?.listings || 0} listings
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleContactSeller}
                    disabled={!user || user?.id === listing.seller.id}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
                {listing.seller.bio && (
                  <p className="text-sm text-gray-600 mt-3">{listing.seller.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Buyer Protection</span>
              </div>
              <p className="text-sm text-gray-600">
                Your purchase is protected. Get a full refund if the item isn't as described or doesn't arrive.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {listing.reviews && listing.reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            <div className="grid gap-4">
              {listing.reviews.map((review: any) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {review.user.avatar ? (
                            <img src={review.user.avatar} alt="" className="w-full h-full rounded-full" />
                          ) : (
                            <User className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{review.user.name}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {format(new Date(review.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}