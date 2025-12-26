/**
 * BaseRegistry - 레지스트리 팩토리 함수
 *
 * 모든 pSEO 레지스트리에서 공유하는 공통 패턴을 추상화
 * - getAll: 모든 아이템 반환
 * - getAllSlugs: 모든 슬러그 반환
 * - getBySlug: 슬러그로 아이템 조회
 * - getRelated: 관련 아이템 조회
 * - getByCategory: 카테고리로 아이템 필터링
 */

/**
 * 레지스트리 아이템의 기본 인터페이스
 * 모든 레지스트리 아이템은 최소한 slug와 name을 가져야 함
 */
export interface BaseRegistryItem<TSlug extends string> {
  slug: TSlug;
  name: string;
}

/**
 * 카테고리를 가진 레지스트리 아이템
 */
export interface CategorizedRegistryItem<
  TSlug extends string,
  TCategory extends string = string,
> extends BaseRegistryItem<TSlug> {
  category: TCategory;
}

/**
 * 레지스트리 팩토리 함수의 반환 타입
 */
export interface RegistryFunctions<TSlug extends string, TItem> {
  /** 원본 레지스트리 객체 */
  items: Record<TSlug, TItem>;

  /** 모든 아이템 배열로 반환 */
  getAll: () => TItem[];

  /** 모든 슬러그 배열로 반환 */
  getAllSlugs: () => TSlug[];

  /** 슬러그로 아이템 조회 (없으면 undefined) */
  getBySlug: (slug: string) => TItem | undefined;

  /** 관련 아이템 조회 (현재 아이템 제외) */
  getRelated: (currentSlug: TSlug, limit?: number) => TItem[];
}

/**
 * 카테고리 지원 레지스트리 함수 타입
 */
export interface CategorizedRegistryFunctions<
  TSlug extends string,
  TItem extends CategorizedRegistryItem<TSlug, TCategory>,
  TCategory extends string = string,
> extends RegistryFunctions<TSlug, TItem> {
  /** 카테고리로 아이템 필터링 */
  getByCategory: (category: TCategory) => TItem[];

  /** 같은 카테고리 우선, 다른 카테고리 포함하여 관련 아이템 조회 */
  getRelated: (currentSlug: TSlug, limit?: number) => TItem[];
}

/**
 * 기본 레지스트리 생성
 *
 * @template TSlug - 슬러그 타입 (유니온 문자열)
 * @template TItem - 아이템 타입
 * @param items - 레지스트리 아이템 객체
 * @returns 레지스트리 헬퍼 함수들
 *
 * @example
 * ```typescript
 * const { getAll, getBySlug, getRelated } = createRegistry(minifyTypeRegistry);
 * const item = getBySlug("json");
 * const related = getRelated("json", 4);
 * ```
 */
export function createRegistry<
  TSlug extends string,
  TItem extends BaseRegistryItem<TSlug>,
>(items: Record<TSlug, TItem>): RegistryFunctions<TSlug, TItem> {
  const getAll = (): TItem[] => Object.values(items) as TItem[];

  const getAllSlugs = (): TSlug[] => Object.keys(items) as TSlug[];

  const getBySlug = (slug: string): TItem | undefined =>
    items[slug as TSlug] ?? undefined;

  const getRelated = (currentSlug: TSlug, limit = 6): TItem[] => {
    const current = items[currentSlug];
    if (!current) return [];

    return getAll()
      .filter((item) => item.slug !== currentSlug)
      .slice(0, limit);
  };

  return {
    items,
    getAll,
    getAllSlugs,
    getBySlug,
    getRelated,
  };
}

/**
 * 카테고리 지원 레지스트리 생성
 *
 * @template TSlug - 슬러그 타입 (유니온 문자열)
 * @template TItem - 아이템 타입 (카테고리 포함)
 * @template TCategory - 카테고리 타입
 * @param items - 레지스트리 아이템 객체
 * @returns 카테고리 필터링 포함 레지스트리 헬퍼 함수들
 *
 * @example
 * ```typescript
 * const registry = createCategorizedRegistry(minifyTypeRegistry);
 * const codeTypes = registry.getByCategory("code");
 * const related = registry.getRelated("json", 4); // 같은 카테고리 우선
 * ```
 */
export function createCategorizedRegistry<
  TSlug extends string,
  TItem extends CategorizedRegistryItem<TSlug, TCategory>,
  TCategory extends string = string,
>(
  items: Record<TSlug, TItem>,
): CategorizedRegistryFunctions<TSlug, TItem, TCategory> {
  const base = createRegistry(items);

  const getByCategory = (category: TCategory): TItem[] =>
    base.getAll().filter((item) => item.category === category);

  const getRelated = (currentSlug: TSlug, limit = 6): TItem[] => {
    const current = items[currentSlug];
    if (!current) return [];

    // 같은 카테고리 아이템 우선
    const sameCategory = base
      .getAll()
      .filter(
        (item) =>
          item.category === current.category && item.slug !== currentSlug,
      );

    // 다른 카테고리 아이템
    const otherCategory = base
      .getAll()
      .filter((item) => item.category !== current.category);

    return [...sameCategory, ...otherCategory].slice(0, limit);
  };

  return {
    ...base,
    getByCategory,
    getRelated,
  };
}
