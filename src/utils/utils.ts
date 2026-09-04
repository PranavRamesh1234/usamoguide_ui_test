import MODULE_ORDERING from '../../content/ordering';
import { ModuleInfo } from '../models/module';

export const getModulesForDivision = (
  allModules: {
    [key: string]: Queries.SyllabusQuery['modules']['nodes'][0];
  },
  division: keyof typeof MODULE_ORDERING
) => {
  const orderedModuleIDs = new Set<string>();
  const orderedChapters = MODULE_ORDERING[division].map(k => ({
    name: k.name,
    items: k.items
      .map(k2 => {
        orderedModuleIDs.add(k2);
        if (!allModules.hasOwnProperty(k2)) {
          console.warn(`Module not found in ${division}: ${k2}`);
          return null;
        }
        return {
          ...allModules[k2 as string],
          slug: `/${division}/${allModules[k2 as string].frontmatter.id}`,
        };
      })
      .filter(Boolean),
    description: k.description,
  }));

  const uncategorizedItems = Object.values(allModules)
    .filter(module => !orderedModuleIDs.has(module.frontmatter.id))
    .map(module => ({
      ...module,
      slug: `/${division}/${module.frontmatter.id}`,
    }));

  if (uncategorizedItems.length === 0) {
    return orderedChapters;
  }

  return [
    ...orderedChapters,
    {
      name: 'Uncategorized',
      items: uncategorizedItems,
      description:
        'Auto-discovered modules not yet placed in a syllabus chapter.',
    },
  ];
};

export function graphqlToModuleInfo(mdx): ModuleInfo {
  return new ModuleInfo(
    mdx.frontmatter.id,
    mdx.fields.division,
    mdx.frontmatter.title,
    mdx.body,
    mdx.frontmatter.author,
    mdx.frontmatter.contributors,
    mdx.frontmatter.prerequisites,
    mdx.frontmatter.description,
    mdx.frontmatter.frequency,
    mdx.toc,
    mdx.parent.relativePath,
    mdx.fields.gitAuthorTime
  );
}

// https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
export function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Map(arr.map(item => [JSON.stringify(item), item])).values()];
}
