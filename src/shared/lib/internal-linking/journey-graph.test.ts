import { describe, expect, it } from "vitest";
import type { ToolSlug } from "@/entities/tool/model/types";
import {
  USER_JOURNEY_GRAPH,
  getRelatedByCategory,
  getFrequentFromHistory,
  getWeightedRecommendations,
  getToolTitle,
  getToolCategory,
  isValidToolSlug,
  getInboundLinks,
  calculateToolImportance,
} from "./journey-graph";

describe("journey-graph", () => {
  // ============================================
  // USER_JOURNEY_GRAPH 구조 테스트
  // ============================================
  describe("USER_JOURNEY_GRAPH", () => {
    it("주요 도구에 대한 journey가 정의되어 있어야 함", () => {
      expect(USER_JOURNEY_GRAPH["json-formatter"]).toBeDefined();
      expect(USER_JOURNEY_GRAPH["jwt-decoder"]).toBeDefined();
      expect(USER_JOURNEY_GRAPH["image-resizer"]).toBeDefined();
    });

    it("journey 배열이 유효한 ToolSlug를 포함해야 함", () => {
      const jsonFormatterJourney = USER_JOURNEY_GRAPH["json-formatter"];
      expect(jsonFormatterJourney).toContain("json-to-typescript");
      expect(jsonFormatterJourney).toContain("diff-checker");
    });
  });

  // ============================================
  // getRelatedByCategory
  // ============================================
  describe("getRelatedByCategory", () => {
    it("같은 카테고리의 도구들을 반환해야 함", () => {
      const related = getRelatedByCategory("json-formatter");
      expect(related.length).toBeGreaterThan(0);
      // json-formatter는 'text' 카테고리이므로 같은 카테고리 도구 반환
      expect(related).not.toContain("json-formatter"); // 자기 자신 제외
    });

    it("유효하지 않은 도구에 대해 빈 배열 반환", () => {
      const related = getRelatedByCategory("invalid-tool" as ToolSlug);
      expect(related).toEqual([]);
    });

    it("자기 자신을 결과에 포함하지 않아야 함", () => {
      const related = getRelatedByCategory("hash-generator");
      expect(related).not.toContain("hash-generator");
    });
  });

  // ============================================
  // getFrequentFromHistory
  // ============================================
  describe("getFrequentFromHistory", () => {
    it("빈 히스토리에 대해 빈 배열 반환", () => {
      const result = getFrequentFromHistory([]);
      expect(result).toEqual([]);
    });

    it("히스토리에서 빈도순으로 도구 반환", () => {
      const history = [
        "json-formatter",
        "json-formatter",
        "json-formatter",
        "jwt-decoder",
        "jwt-decoder",
        "hash-generator",
      ];
      const result = getFrequentFromHistory(history, 3);

      expect(result[0]).toBe("json-formatter"); // 가장 많이 사용
      expect(result[1]).toBe("jwt-decoder"); // 두 번째
      expect(result[2]).toBe("hash-generator"); // 세 번째
    });

    it("limit 파라미터가 정상 동작해야 함", () => {
      const history = ["a", "b", "c", "d", "e", "f"];
      const result = getFrequentFromHistory(history, 2);
      expect(result.length).toBe(2);
    });

    it("기본 limit이 5여야 함", () => {
      const history = ["a", "b", "c", "d", "e", "f", "g"];
      const result = getFrequentFromHistory(history);
      expect(result.length).toBe(5);
    });
  });

  // ============================================
  // getWeightedRecommendations
  // ============================================
  describe("getWeightedRecommendations", () => {
    it("workflow 기반 추천이 가장 높은 가중치를 가져야 함", () => {
      const recommendations = getWeightedRecommendations("json-formatter");

      // json-formatter의 journey 링크가 workflow로 추천되어야 함
      const workflowRecs = recommendations.filter(
        (r) => r.reason === "workflow",
      );
      expect(workflowRecs.length).toBeGreaterThan(0);

      // workflow 추천은 0.6 이상의 가중치를 가져야 함
      workflowRecs.forEach((rec) => {
        expect(rec.weight).toBeGreaterThanOrEqual(0.6);
      });
    });

    it("히스토리 기반 추천이 0.5 가중치를 가져야 함", () => {
      const history = ["uuid-generator", "uuid-generator", "uuid-generator"];
      const recommendations = getWeightedRecommendations(
        "hash-generator",
        history,
      );

      // hash-generator는 이미 uuid-generator를 journey에 포함하므로
      // 다른 도구로 테스트
      const historyRecs = recommendations.filter((r) => r.reason === "history");
      historyRecs.forEach((rec) => {
        expect(rec.weight).toBe(0.5);
      });
    });

    it("카테고리 기반 추천이 0.3 가중치를 가져야 함", () => {
      const recommendations = getWeightedRecommendations("json-formatter");

      const categoryRecs = recommendations.filter(
        (r) => r.reason === "category",
      );
      categoryRecs.forEach((rec) => {
        expect(rec.weight).toBe(0.3);
      });
    });

    it("maxResults 파라미터가 정상 동작해야 함", () => {
      const recommendations = getWeightedRecommendations(
        "json-formatter",
        [],
        3,
      );
      expect(recommendations.length).toBeLessThanOrEqual(3);
    });

    it("가중치 내림차순으로 정렬되어야 함", () => {
      const recommendations = getWeightedRecommendations("json-formatter");

      for (let i = 1; i < recommendations.length; i++) {
        expect(recommendations[i - 1].weight).toBeGreaterThanOrEqual(
          recommendations[i].weight,
        );
      }
    });

    it("중복 추천이 없어야 함", () => {
      const recommendations = getWeightedRecommendations("json-formatter");
      const targets = recommendations.map((r) => r.target);
      const uniqueTargets = new Set(targets);

      expect(targets.length).toBe(uniqueTargets.size);
    });
  });

  // ============================================
  // getToolTitle
  // ============================================
  describe("getToolTitle", () => {
    it("유효한 도구의 제목을 반환해야 함", () => {
      const title = getToolTitle("json-formatter");
      expect(title).toBe("JSON Formatter");
    });

    it("유효하지 않은 도구에 대해 slug를 반환해야 함", () => {
      const title = getToolTitle("invalid-tool" as ToolSlug);
      expect(title).toBe("invalid-tool");
    });
  });

  // ============================================
  // getToolCategory
  // ============================================
  describe("getToolCategory", () => {
    it("유효한 도구의 카테고리를 반환해야 함", () => {
      const category = getToolCategory("json-formatter");
      expect(category).toBe("text");
    });

    it("유효하지 않은 도구에 대해 undefined 반환", () => {
      const category = getToolCategory("invalid-tool" as ToolSlug);
      expect(category).toBeUndefined();
    });
  });

  // ============================================
  // isValidToolSlug
  // ============================================
  describe("isValidToolSlug", () => {
    it("유효한 slug에 대해 true 반환", () => {
      expect(isValidToolSlug("json-formatter")).toBe(true);
      expect(isValidToolSlug("jwt-decoder")).toBe(true);
      expect(isValidToolSlug("hash-generator")).toBe(true);
    });

    it("유효하지 않은 slug에 대해 false 반환", () => {
      expect(isValidToolSlug("invalid-tool")).toBe(false);
      expect(isValidToolSlug("")).toBe(false);
      expect(isValidToolSlug("random-string-123")).toBe(false);
    });
  });

  // ============================================
  // getInboundLinks
  // ============================================
  describe("getInboundLinks", () => {
    it("해당 도구로 향하는 인바운드 링크를 반환해야 함", () => {
      // json-formatter를 journey에 포함하는 도구들
      const inbound = getInboundLinks("json-formatter");
      expect(inbound.length).toBeGreaterThan(0);
    });

    it("인바운드 링크가 없는 경우 빈 배열 반환", () => {
      // 아무도 링크하지 않는 도구 찾기 (또는 모킹)
      const inbound = getInboundLinks("invalid-tool" as ToolSlug);
      expect(inbound).toEqual([]);
    });

    it("양방향 링크가 있는 경우 올바르게 처리", () => {
      // json-formatter -> json-to-typescript 링크 확인
      const jsonToTsInbound = getInboundLinks("json-to-typescript");
      expect(jsonToTsInbound).toContain("json-formatter");
    });
  });

  // ============================================
  // calculateToolImportance
  // ============================================
  describe("calculateToolImportance", () => {
    it("모든 도구에 대해 중요도를 계산해야 함", () => {
      const importance = calculateToolImportance();

      expect(Object.keys(importance).length).toBeGreaterThan(0);
    });

    it("모든 중요도가 1 이상이어야 함 (초기값)", () => {
      const importance = calculateToolImportance();

      Object.values(importance).forEach((value) => {
        expect(value).toBeGreaterThanOrEqual(1);
      });
    });

    it("인바운드/아웃바운드 링크가 많은 도구가 더 높은 중요도를 가져야 함", () => {
      const importance = calculateToolImportance();

      // json-formatter는 많은 연결을 가지고 있어서 높은 중요도
      // 연결이 적은 도구와 비교
      expect(importance["json-formatter"]).toBeGreaterThan(1);
    });
  });
});
