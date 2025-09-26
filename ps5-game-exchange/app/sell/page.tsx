"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Upload, X, Loader2, Info } from 'lucide-react'

export default function SellPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'LIKE_NEW',
    images: [] as string[],
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      if (!data.user) {
        toast.error('Please login to sell games')
        router.push('/login')
      } else {
        setUser(data.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/login')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // For demo purposes, we'll use data URLs
    // In production, you'd upload to Cloudinary or similar
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, e.target!.result as string].slice(0, 5), // Max 5 images
          }))
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.price) {
      toast.error('Please fill in all required fields')
      return
    }

    if (parseFloat(formData.price) <= 0) {
      toast.error('Price must be greater than 0')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create listing')
      }

      const listing = await res.json()
      toast.success('Listing created successfully!')
      router.push(`/listings/${listing.id}`)
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">List Your PS5 Game</CardTitle>
            <CardDescription>
              Share your game with the community and find it a new home
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Game Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Spider-Man: Miles Morales"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              {/* Condition */}
              <div>
                <Label htmlFor="condition">Condition *</Label>
                <select
                  id="condition"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={loading}
                >
                  <option value="NEW">Brand New (Sealed)</option>
                  <option value="LIKE_NEW">Like New (Opened, pristine condition)</option>
                  <option value="VERY_GOOD">Very Good (Minor signs of use)</option>
                  <option value="GOOD">Good (Some visible wear)</option>
                  <option value="ACCEPTABLE">Acceptable (Works perfectly, shows wear)</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Be honest about the condition to build trust with buyers
                </p>
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price">Price (USD) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="pl-8"
                    required
                    disabled={loading}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Check similar listings to price competitively
                </p>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Describe your game's condition, any included items (manual, DLC codes), and why you're selling..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                  disabled={loading}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Minimum 10 characters. Be detailed to help buyers make informed decisions.
                </p>
              </div>

              {/* Images */}
              <div>
                <Label>Photos (Optional but recommended)</Label>
                <div className="mt-2">
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={loading}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {formData.images.length < 5 && (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Click to upload photos</span>
                      <span className="text-xs text-gray-400">Max 5 images</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        disabled={loading || formData.images.length >= 5}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Tips for a successful sale:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Include clear photos of the game, case, and any included items</li>
                      <li>Be honest about the condition to avoid disputes</li>
                      <li>Price competitively based on similar listings</li>
                      <li>Respond quickly to buyer inquiries</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating listing...
                    </>
                  ) : (
                    'Create Listing'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}