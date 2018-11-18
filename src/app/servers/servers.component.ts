import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverName = 'TestServer';
  serverCreated = false;
  servers = ['my test server', 'my test server 2'];

  testButtonToggle = false;
  testButtonLog = [];
  password = 'salmon';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: any) {
    this.serverName = event.target;
  }

  onTestButtonClick() {
    this.testButtonToggle = !this.testButtonToggle;
    this.testButtonLog.push(new Date());
  }
}
