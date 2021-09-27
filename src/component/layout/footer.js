import React, {Component, Fragment} from 'react';

export default class Footer extends Component {
    render(){
        return(
            <Fragment>
                    <footer class="main-footer">
                        <strong>Copyright &copy; 2021 <a href="https://adminlte.io">Putra Manunggal</a>.</strong>
                        All rights reserved.
                        <div class="float-right d-none d-sm-inline-block">
                        <b>Version</b> 3.1.0
                        </div>
                    </footer>
                    {/* Control Sidebar */}
                    <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                    </aside>
                    {/* /.control-sidebar */}

            </Fragment>
        )
    }
}