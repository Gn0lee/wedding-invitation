'use client';

import { Edit, Trash2, Eye, Search } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { type AdminGalleryItem } from '@/domains/gallery/types/items';
import { utcToKoreaTimeForDateTimeLocal, koreaTimeToUtcForDateTimeLocal } from '@/lib/date-utils';
interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface GalleryResponse {
  success: boolean;
  data?: {
    items: AdminGalleryItem[];
    pagination: PaginationData;
  };
  error?: string;
}

export function GalleryManageTable() {
  const [items, setItems] = useState<AdminGalleryItem[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // 이미지 미리보기 상태
  const [previewImage, setPreviewImage] = useState<AdminGalleryItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // 편집 상태
  const [editingItem, setEditingItem] = useState<AdminGalleryItem | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    brideComment: '',
    groomComment: '',
    takenAt: new Date().toISOString(), // 기본값을 현재 시간으로 설정
  });

  // 삭제 확인 상태
  const [deletingItem, setDeletingItem] = useState<AdminGalleryItem | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // 편집 저장 상태
  const [isSaving, setIsSaving] = useState(false);

  // 갤러리 아이템 조회
  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: debouncedSearch,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/admin/gallery/items?${params}`);
      const data: GalleryResponse = await response.json();

      if (data.success && data.data) {
        setItems(data.data.items);
        setPagination(data.data.pagination);
      } else {
        toast.error(data.error || '갤러리 아이템 조회에 실패했습니다.');
      }
    } catch (error) {
      console.error('Gallery items fetch error:', error);
      toast.error('갤러리 아이템 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경
  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // 검색 debounce 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 검색 및 정렬 변경 시 페이지 초기화
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [debouncedSearch, sortBy, sortOrder]);

  // 갤러리 아이템 조회
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit, debouncedSearch, sortBy, sortOrder]);

  // 이미지 미리보기 열기
  const handlePreview = (item: AdminGalleryItem) => {
    setPreviewImage(item);
    setShowPreview(true);
  };

  // 편집 다이얼로그 열기
  const handleEdit = (item: AdminGalleryItem) => {
    setEditingItem(item);
    setEditForm({
      name: item.name,
      brideComment: item.brideComment || '',
      groomComment: item.groomComment || '',
      takenAt: item.takenAt, // 원본 값 그대로 사용
    });
    setShowEditDialog(true);
  };

  // 편집 저장
  const handleSaveEdit = async () => {
    if (!editingItem) return;

    setIsSaving(true);

    try {
      // 한국 시간을 UTC로 변환
      const updateData = {
        ...editForm,
        takenAt: koreaTimeToUtcForDateTimeLocal(editForm.takenAt),
      };

      const response = await fetch(`/api/admin/gallery/items/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('갤러리 아이템이 성공적으로 수정되었습니다.');
        setShowEditDialog(false);
        fetchItems(); // 목록 새로고침
      } else {
        toast.error(data.error || '갤러리 아이템 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Gallery item update error:', error);
      toast.error('갤러리 아이템 수정 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 삭제 다이얼로그 열기
  const handleDelete = (item: AdminGalleryItem) => {
    setDeletingItem(item);
    setShowDeleteDialog(true);
  };

  // 삭제 확인
  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    try {
      const response = await fetch(`/api/admin/gallery/items/${deletingItem.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('갤러리 아이템이 성공적으로 삭제되었습니다.');
        setShowDeleteDialog(false);
        fetchItems(); // 목록 새로고침
      } else {
        toast.error(data.error || '갤러리 아이템 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Gallery item deletion error:', error);
      toast.error('갤러리 아이템 삭제 중 오류가 발생했습니다.');
    }
  };

  // 날짜 포맷팅 (한국 시간 기준)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Seoul',
    });
  };

  return (
    <div className="space-y-6">
      {/* 검색 및 정렬 컨트롤 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Search className="size-4 text-muted-foreground" />
          <Input
            placeholder="이름, 댓글으로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">등록일</SelectItem>
              <SelectItem value="takenAt">촬영일</SelectItem>
              <SelectItem value="likes">좋아요</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">내림차순</SelectItem>
              <SelectItem value="asc">오름차순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 테이블 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>신랑 코멘트</TableHead>
              <TableHead>신부 코멘트</TableHead>
              <TableHead className="w-20">좋아요</TableHead>
              <TableHead>촬영일</TableHead>
              <TableHead>업로드일</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center">
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center">
                  갤러리 아이템이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="max-w-32 truncate">{item.groomComment || '-'}</TableCell>
                  <TableCell className="max-w-32 truncate">{item.brideComment || '-'}</TableCell>
                  <TableCell>{item.likes}</TableCell>
                  <TableCell>{formatDate(item.takenAt)}</TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handlePreview(item)}>
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(item)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            총 {pagination.total}개 중 {(pagination.page - 1) * pagination.limit + 1}-
            {Math.min(pagination.page * pagination.limit, pagination.total)}개
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.hasPrev) {
                      handlePageChange(pagination.page - 1);
                    }
                  }}
                  className={!pagination.hasPrev ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNum);
                    }}
                    isActive={pageNum === pagination.page}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.hasNext) {
                      handlePageChange(pagination.page + 1);
                    }
                  }}
                  className={!pagination.hasNext ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* 이미지 미리보기 다이얼로그 */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewImage?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 text-gray-50">
            <div className="flex justify-center">
              <Image
                src={previewImage?.src || ''}
                alt={previewImage?.name || ''}
                width={800}
                height={600}
                className="max-h-96 max-w-full rounded object-contain"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>신랑 댓글:</strong>
                <p className="mt-1">{previewImage?.groomComment || '-'}</p>
              </div>
              <div>
                <strong>신부 댓글:</strong>
                <p className="mt-1">{previewImage?.brideComment || '-'}</p>
              </div>
              <div>
                <strong>촬영일:</strong>
                <p className="mt-1">{formatDate(previewImage?.takenAt || '')}</p>
              </div>
              <div>
                <strong>좋아요:</strong>
                <p className="mt-1">{previewImage?.likes || 0}개</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 편집 다이얼로그 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>갤러리 아이템 편집</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-gray-50">
            <div className="space-y-2">
              <Label htmlFor="edit-name">이름</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="이미지 이름"
                className="placeholder:text-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-takenAt">촬영일</Label>
              <Input
                id="edit-takenAt"
                type="datetime-local"
                value={(() => {
                  try {
                    return editForm.takenAt ? utcToKoreaTimeForDateTimeLocal(editForm.takenAt) : '';
                  } catch {
                    return '';
                  }
                })()}
                onChange={(e) => setEditForm((prev) => ({ ...prev, takenAt: e.target.value }))}
                className="placeholder:text-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-groomComment">신랑 댓글</Label>
              <Textarea
                id="edit-groomComment"
                value={editForm.groomComment}
                onChange={(e) => setEditForm((prev) => ({ ...prev, groomComment: e.target.value }))}
                placeholder="신랑 댓글을 입력하세요"
                rows={3}
                className="placeholder:text-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-brideComment">신부 댓글</Label>
              <Textarea
                id="edit-brideComment"
                value={editForm.brideComment}
                onChange={(e) => setEditForm((prev) => ({ ...prev, brideComment: e.target.value }))}
                placeholder="신부 댓글을 입력하세요"
                rows={3}
                className="placeholder:text-gray-50"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)} disabled={isSaving}>
              취소
            </Button>
            <Button onClick={handleSaveEdit} disabled={isSaving}>
              {isSaving ? '저장 중...' : '저장'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-50">갤러리 아이템 삭제</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-50">
              &quot;{deletingItem?.name}&quot; 갤러리 아이템을 삭제하시겠습니까?
              <br />이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
