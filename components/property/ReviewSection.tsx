// components/property/ReviewSection.tsx
import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

interface ReviewSectionProps {
  propertyId: string;
}

const ReviewSection = ({ propertyId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() =>
