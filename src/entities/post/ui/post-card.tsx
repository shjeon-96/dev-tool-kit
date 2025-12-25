import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from "@/shared/ui";
import { BlogPost } from "../model/types";

interface PostCardProps {
  post: BlogPost;
  locale: string;
}

export function PostCard({ post, locale }: PostCardProps) {
  const title = post.title[locale as keyof typeof post.title] || post.title.en;
  const excerpt =
    post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en;

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="capitalize">
            {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(post.date), "MMM d, yyyy")}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTimeMinutes} min read
          </span>
        </div>
        <CardTitle className="text-xl md:text-2xl line-clamp-2">
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="hover:text-primary transition-colors"
          >
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/${locale}/blog/${post.slug}`} className="w-full">
          <Button variant="ghost" className="w-full justify-between group">
            {locale === "ko"
              ? "계속 읽기"
              : locale === "ja"
                ? "続きを読む"
                : "Read More"}
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
