import React, { Component } from 'react'
import PT from 'prop-types'
import moment from 'moment'
import Panel from '../Panel/Panel'
import DeleteProjectModal from './DeleteProjectModal'
import ProjectCardBody from '../../projects/components/projectsCard/ProjectCardBody'
import ProjectDirectLinks from '../../projects/list/components/Projects/ProjectDirectLinks'
import MobileExpandable from '../MobileExpandable/MobileExpandable'
import MediaQuery from 'react-responsive'
import { SCREEN_BREAKPOINT_MD } from '../../config/constants'

import './ProjectInfo.scss'

class ProjectInfo extends Component {

  constructor(props) {
    super(props)
    this.toggleProjectDelete = this.toggleProjectDelete.bind(this)
    this.onConfirmDelete = this.onConfirmDelete.bind(this)
  }

  componentWillMount() {
    this.setState({ showDeleteConfirm: false })
  }

  toggleProjectDelete() {
    this.setState({ showDeleteConfirm: !this.state.showDeleteConfirm })
  }

  onConfirmDelete() {
    this.props.onDeleteProject()
  }

  render() {
    const { project, currentMemberRole, duration, canDeleteProject, onChangeStatus, directLinks, isSuperUser } = this.props
    const { showDeleteConfirm } = this.state
    return (
      <div className="project-info">
        <div className="project-info-header">
          <div className="project-overview">
            <div className="project-overview-header">Project overview</div>
            <div className="project-overview-time">Created {moment(project.updatedAt).format('MMM DD, YYYY')}</div>
          </div>
          {canDeleteProject && !showDeleteConfirm &&
            <div className="project-delete-icon">
              <Panel.DeleteBtn onClick={this.toggleProjectDelete} />
            </div>
          }
        </div>
        <MobileExpandable title="DESCRIPTION" defaultOpen>
          <Panel>
            {showDeleteConfirm &&
              <DeleteProjectModal
                onCancel={this.toggleProjectDelete}
                onConfirm={this.onConfirmDelete}
              />
            }
          </Panel>
          <MediaQuery minWidth={SCREEN_BREAKPOINT_MD}>
            {(matches) => (
              <ProjectCardBody
                project={project}
                currentMemberRole={currentMemberRole}
                duration={duration}
                descLinesCount={
                  /* has to be not too big value here,
                     because the plugin will make this number of iterations
                     see https://github.com/ShinyChang/React-Text-Truncate/blob/master/src/TextTruncate.js#L133
                     too big value may cause browser tab to freeze
                   */
                  matches ? 4 : 1000
                }
                onChangeStatus={onChangeStatus}
                isSuperUser={isSuperUser}
                showLink
              />
            )}
          </MediaQuery>
          <ProjectDirectLinks
            directLinks={directLinks}
          />
        </MobileExpandable>
      </div>
    )
  }
}

ProjectInfo.propTypes = {
  project: PT.object.isRequired,
  currentMemberRole: PT.string,
  duration: PT.object.isRequired
}

export default ProjectInfo
