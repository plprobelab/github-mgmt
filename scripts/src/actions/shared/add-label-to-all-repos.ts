import {Config} from '../../yaml/config'
import {Repository} from '../../resources/repository'
import {RepositoryLabel} from '../../resources/repository-label'
import * as core from '@actions/core'

export async function addLabelToAllRepos(
  name: string,
  color: string | undefined = undefined,
  description: string | undefined = undefined,
  repositoryFilter: (repository: Repository) => boolean = () => true
): Promise<void> {
  const config = Config.FromPath()

  const repositories = config
    .getResources(Repository)
    .filter(r => !r.archived)
    .filter(repositoryFilter)

  for (const repository of repositories) {
    const label = new RepositoryLabel(repository.name, name)
    label.color = color
    label.description = description

    if (!config.someResource(label)) {
      core.info(`Adding ${label.name} file to ${label.repository} repository`)
      config.addResource(label)
    }
  }

  config.save()
}
