# Code Style

The project intentionally uses readable multi-line TypeScript.

## Rules

1. One import per line.
2. Blank line between external and local imports.
3. Functions use multi-line bodies.
4. React Query options are one property per line.
5. Mutation callbacks are expanded instead of compressed.
6. Interfaces use one property per line.
7. Components should have one responsibility.
8. Entity hooks own server-state access.
9. Admin create/update/delete actions are modals, not CRUD routes.
10. Admin routes represent list/table pages.

Example:

```ts
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import { competitionRepository } from "../api/competition";

export function useCompetition(id: string) {
  return useQuery({
    queryKey: queryKeys.competitions.detail(id),
    queryFn: () => competitionRepository.getById(id),
    enabled: Boolean(id),
  });
}
```
