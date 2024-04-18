provider "google" {
  credentials = file("norse-voice-341503-b95b4cadf95c.json")
  project     = "norse-voice-341503"
  region      = "us-central1"
}

resource "google_compute_instance" "instance-20240418-204433" {
  name         = "instance-20240418-204433"
  machine_type = "e2-small"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12-bookworm-v20240415"
      size  = 10
      type  = "pd-balanced"
    }
    auto_delete = true
  }

  network_interface {
    network    = "default"
    subnetwork = "default"
    access_config {
    }
  }

  scheduling {
    preemptible       = false
    on_host_maintenance = "MIGRATE"
    automatic_restart = true
  }

  service_account {
    email  = "hometask@norse-voice-341503.iam.gserviceaccount.com"
    scopes = ["cloud-platform"]
  }

  shielded_instance_config {
    enable_secure_boot          = false
    enable_vtpm                 = true  
    enable_integrity_monitoring = true
  }

  tags = ["http-server"]

  metadata = {
    "ssh-keys" = "ruslan:${file("id_rsa.pub")}"
    block-project-ssh-keys = "true"
  }
}
